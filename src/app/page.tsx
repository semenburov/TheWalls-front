import { AboutSection } from '@/features/home/components/sections/AboutSection'
import { CTASection } from '@/features/home/components/sections/CTASection'
import { FeaturesSection } from '@/features/home/components/sections/FeaturesSection'
import { HeroSection } from '@/features/home/components/sections/HeroSection'

export default function Home() {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<AboutSection />
			<CTASection />
		</>
	)
}
