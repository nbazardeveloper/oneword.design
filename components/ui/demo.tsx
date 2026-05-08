'use client';
import TestimonialV2 from '@/components/ui/testimonial-v2';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

export default function DefaultDemo() {
	const images = [
		{
			src: '/images/projects/oneword-project-limo-website.webp',
			alt: 'OneWord limo website project',
		},
		{
			src: '/images/projects/oneword-project-beauty-website.webp',
			alt: 'OneWord beauty website project',
		},
		{
			src: '/images/projects/oneword-project-nail-website.webp',
			alt: 'OneWord nail website project',
		},
		{
			src: '/images/projects/oneword-project-cleaning-website.webp',
			alt: 'OneWord cleaning website project',
		},
		{
			src: '/images/projects/oneword-project-limo-whitewebsite.webp',
			alt: 'OneWord limo white website project',
		},
		{
			src: '/images/projects/oneword-project-nailsalon-website.webp',
			alt: 'OneWord nail salon website project',
		},
		{
			src: '/images/projects/oneword-project-beauty-websitemobil.webp',
			alt: 'OneWord beauty mobile website project',
		},
	];

	return (
		<section aria-label="Featured projects" className="hero-surface min-h-screen w-full text-white">
			<div className="container-xl pt-8 md:pt-12">
				<div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
					<p
						className="mb-5 flex items-center justify-center gap-2.5 select-none text-on-dark-faint"
						aria-hidden="true"
						style={{
							fontSize: '11px',
							textTransform: 'uppercase',
							letterSpacing: '0.2em',
						}}
					>
						<span
							style={{
								display: 'inline-block',
								height: '1px',
								width: '28px',
								background: 'var(--color-brand-acid)',
								borderRadius: '99px',
								flexShrink: 0,
							}}
						/>
						Featured Projects
					</p>
					<h2
						className="text-balance font-bold tracking-tight text-on-dark"
						style={{
							fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
							lineHeight: 1.08,
						}}
					>
						Take a look at the projects behind the
						<span style={{ color: 'var(--color-brand-acid)' }}> results.</span>
					</h2>
					<p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-on-dark-muted md:text-lg">
						A closer look at the work, layouts, and visual systems used to turn strategy into a site that performs.
					</p>
				</div>
			</div>
			<ZoomParallax images={images} />
			<TestimonialV2 />
		</section>
	);
}