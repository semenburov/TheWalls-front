'use client'

import { PUBLIC_PAGES } from '@/config/pages/public.config'
import authService from '@/features/auth/services/auth.service'
import { IFormData } from '@/features/auth/types/auth.types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useRef, useState, useTransition } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
/**
 * @typedef {Object} AuthFormValues
 * @property {string} email
 * @property {string} password
 * @property {string} [confirm] - тільки для реєстрації
 */
export interface AuthFormValues {
	email: string
	password: string
	confirm?: string
}

/**
 * @typedef {Object} PasswordRule
 * @property {string} key
 * @property {string} label
 * @property {(value: string) => boolean} check
 */
interface PasswordRule {
	key: string
	label: string
	check: (v: string) => boolean
}

/**
 * @typedef {Object} PasswordCheck
 * @property {string} key
 * @property {string} label
 * @property {boolean} checked
 */
export interface PasswordCheck {
	key: string
	label: string
	checked: boolean
}

const passwordRules: PasswordRule[] = [
	{
		key: 'lower',
		label: 'Contains at least 1 lowercase letter',
		check: v => /[a-z]/.test(v),
	},
	{
		key: 'upper',
		label: 'Contains at least 1 uppercase letter',
		check: v => /[A-Z]/.test(v),
	},
	{
		key: 'number',
		label: 'Contains at least 1 number',
		check: v => /\d/.test(v),
	},
	{
		key: 'special',
		label: 'Contains at least 1 special character',
		check: v => /[^A-Za-z0-9]/.test(v),
	},
	{
		key: 'length',
		label: 'Is at least 8 characters long',
		check: v => v.length >= 8,
	},
]

/**
 * Кастомний хук для керування формою аутентифікації
 * @param {Object} params
 * @param {boolean} params.isLogin - Чи це логін (true), чи реєстрація (false)
 */
export function useAuthForm({ isLogin }: { isLogin: boolean }) {
	const { register, handleSubmit, reset } = useForm<IFormData>()

	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const recaptchaRef = useRef<ReCAPTCHA>(null)

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IFormData) =>
			authService.main('login', data, recaptchaRef.current?.getValue()),
		onSuccess() {
			startTransition(() => {
				reset()
				router.push(PUBLIC_PAGES.MAIN + '?success=1')
			})
		},
		onError(error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message)
			}
		},
	})

	const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IFormData) =>
			authService.main('register', data, recaptchaRef.current?.getValue()),
		onSuccess() {
			startTransition(() => {
				reset()
				//router.push(PUBLIC_PAGES.PLANS) //REDIRECT AFTER REGISTER
				router.push(PUBLIC_PAGES.MAIN + '?success=1')
			})
		},
		onError(error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.message)
			}
		},
	})

	const onSubmit: SubmitHandler<IFormData> = data => {
		const token = recaptchaRef.current?.getValue()

		if (!token) {
			toast.error('Please complete the captcha')
			return
		}

		if (isLogin) {
			mutateLogin(data)
		} else {
			mutateRegister(data)
		}
	}

	const isSubmitting = isPending || isLoginPending || isRegisterPending

	const [values, setValues] = useState<AuthFormValues>({
		email: '',
		password: '',
		confirm: '',
	})
	const [errors, setErrors] = useState<Partial<AuthFormValues>>({})
	//const [isSubmitting, setIsSubmitting] = useState(false)

	const passwordChecks: PasswordCheck[] = !isLogin
		? passwordRules.map(rule => ({
				key: rule.key,
				label: rule.label,
				checked: rule.check(values.password || ''),
		  }))
		: []

	const validate = (values: AuthFormValues) => {
		const errs: Partial<AuthFormValues> = {}
		if (!values.email) errs.email = 'Email is required'
		// Add more validation as needed
		if (!values.password) errs.password = 'Password is required'
		if (!isLogin) {
			if (!values.confirm) errs.confirm = 'Confirm your password'
			if (values.password !== values.confirm)
				errs.confirm = 'Passwords do not match'
			// Password strength
			for (const rule of passwordRules) {
				if (!rule.check(values.password)) {
					errs.password = 'Password is not strong enough'
					break
				}
			}
		}
		return errs
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues(v => ({ ...v, [e.target.name]: e.target.value }))
	}

	// const handleSubmit = async (e: React.FormEvent) => {
	// 	e.preventDefault()
	// 	setIsSubmitting(true)
	// 	const errs = validate(values)
	// 	setErrors(errs)
	// 	if (Object.keys(errs).length === 0) {
	// 		// TODO: handle API logic here
	// 		// Example: await apiAuth(values)
	// 		setIsSubmitting(false)
	// 	} else {
	// 		setIsSubmitting(false)
	// 	}
	// }

	return {
		register,
		recaptchaRef,
		values,
		//isLoading,
		onSubmit,
		errors,
		handleChange,
		handleSubmit,
		isSubmitting,
		passwordChecks,
	}
}
