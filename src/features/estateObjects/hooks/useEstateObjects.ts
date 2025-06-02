import { useApiErrorHandler } from '@/shared/hooks/useApiErrorHandler'
import { useBaseMutation } from '@/shared/hooks/useBaseMutation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { EstateObjectService } from '../services/estateObject.service'
import {
	CreateEstateObjectDto,
	EstateObjectEntity,
} from '../types/object.types'

export const useEstateObjects = (params?: Record<string, any>) =>
	useQuery({
		queryKey: ['estateObjects', params],
		queryFn: () => EstateObjectService.getEstateObjects(params),
	})

export const useEstateObject = (id: string) =>
	useQuery({
		queryKey: ['estateObject', id],
		queryFn: () => EstateObjectService.getEstateObjectById(id),
		enabled: !!id,
	})

export const useCreateEstateObject = () => {
	const errorHandler = useApiErrorHandler()
	const queryClient = useQueryClient()
	return useBaseMutation<EstateObjectEntity, CreateEstateObjectDto>(
		EstateObjectService.createEstateObject,
		{
			onError: errorHandler,
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ['estateObjects'] }),
		}
	)
}

export const useUpdateEstateObject = () => {
	const errorHandler = useApiErrorHandler()
	const queryClient = useQueryClient()
	return useBaseMutation<
		EstateObjectEntity,
		{ id: string; dto: Partial<CreateEstateObjectDto> }
	>(({ id, dto }) => EstateObjectService.updateEstateObject(id, dto), {
		onError: errorHandler,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['estateObjects'] }),
	})
}

export const useDeleteEstateObject = () => {
	const errorHandler = useApiErrorHandler()
	const queryClient = useQueryClient()
	return useBaseMutation<void, string>(EstateObjectService.deleteEstateObject, {
		onError: errorHandler,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['estateObjects'] }),
	})
}
