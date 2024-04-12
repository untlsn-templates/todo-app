import * as u from 'unocss';
import { presetAio } from 'untlsn-unocss';


export default u.defineConfig({
	theme: {
		colors: {
			bg: {
				primary: {
					light: '#FAFAFA',
					dark:  '#24263C',
				},
				secondary: {
					light: '#FAFAFA',
					dark:  '#151521',
				},
			},
		},
	},
	rules: [
		[/bg-image-(\S+)/, ([,name]) => {
			return { 'background-image': `url('/images/bg-${name}.jpg')` };
		}],
	],
	presets: [
		u.presetUno(),
		u.presetWind(),
		u.presetIcons(),
		u.presetTypography(),
		u.presetWebFonts({
			fonts: {
				sans: 'Josefin Sans',
			},
		}),
		presetAio(),
	],
	transformers: [
		u.transformerDirectives(),
		u.transformerCompileClass(),
		u.transformerVariantGroup(),
	],
});
