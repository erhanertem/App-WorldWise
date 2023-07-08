const flagEmojiToPNG = flag => {
	const countryCode = Array.from(flag, codeUnit => codeUnit.codePointAt())
		.map(char => String.fromCharCode(char - 127397).toLowerCase())
		.join('')
	// console.log('⛔', countryCode)
	// G = ASCII 71 + 127397 = UNICODE 127468 (0x1F1EC) = 🇬
	// B = ASCII 66 + 127397 = UNICODE 127463 (0x1F1E7) = 🇧

	return (
		<img
			src={`https://flagcdn.com/24x18/${countryCode}.png`}
			alt="country flag"
		/>
	)
}

export default flagEmojiToPNG
