import { AboutSection } from '@/features/home/components/AboutSection' // Секція "Про нас"
import { CTASection } from '@/features/home/components/CTASection' // Секція заклику до дії (Call To Action)
import { FeaturesSection } from '@/features/home/components/FeaturesSection' // Секція з особливостями/перевагами
import { HeroSection } from '@/features/home/components/HeroSection' // Головний банер/секція Hero

/**
 * Головний компонент сторінки (Home page).
 * Відповідає за рендеринг основних секцій головної сторінки.
 *
 * @returns {JSX.Element} - React-компонент головної сторінки
 */
export default function Home() {
	return (
		<>
			<HeroSection /> {/* Головний банер з основним меседжем */}
			<FeaturesSection />{' '}
			{/* Секція з ключовими перевагами/функціями продукту */}
			<AboutSection /> {/* Інформація про сервіс/команду/компанію */}
			<CTASection /> {/* Заклик до дії: зареєструватися, спробувати, тощо */}
		</>
	)
}
