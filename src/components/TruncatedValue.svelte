<script lang="ts">
	// Inputs
	export let value: string

	// (View options)
	export let startLength = 6
	export let endLength = 4

	export let format: 'abbr' | 'visual' | 'visual-characters' = 'visual'
</script>


{#if format === 'abbr'}
	{@const formattedValue = `${value.slice(0, startLength)}⸱⸱⸱${value.slice(-endLength)}`}

	<abbr title={value}>{formattedValue}</abbr>

{:else if format === 'visual'}
	<span
		data-format="visual"
		tabindex="0"
	>
		{#if value}
			{@const start = value.slice(0, startLength)}
			{@const middle = value.slice(startLength, -endLength || undefined)}
			{@const end = value.slice(-endLength || undefined)}

			<span>{start}</span><span class="middle"><span>{middle.slice(0, middle.length / 2)}</span><span></span><span>{middle.slice(middle.length / 2)}</span></span><span>{end}</span>
		{/if}
	</span>

{:else if format === 'visual-characters'}
	<span
		data-format="visual-characters"
		tabindex="0"
	>{#if startLength}<span>{value.slice(0, startLength)}</span>{/if}<span class="middle" style:--l={value.length - startLength - endLength}>{#each value.slice(startLength, -endLength || undefined) as char, i}<span style:--i={i}>{char}</span>{/each}</span>{#if endLength}<span>{value.slice(-endLength)}</span>{/if}</span>

{/if}


<style>
	[tabindex] {
		&:is(:active, :focus-within) {
			--isTruncated: 0;
		}

		&:not(:is(:active, :focus-within)) {
			--isTruncated: 1;
			cursor: zoom-in;
		}

		* {
			text-decoration: none;
		}

		&:focus-within {
			outline: 1px solid var(--primary-color);
			outline-offset: 2px;
			text-shadow: 0 0.5px 0.2em var(--primary-color);
		}

		&[data-format="visual"] > .middle {
			align-items: baseline;

			> span {
				word-break: break-all;

				transition-property: font-size;
				transition-duration: 0.2s;
				transition-timing-function: var(--ease-out-expo);

				&:not(:empty) {
					font-size: calc((1 - var(--isTruncated)) * 1em);
					letter-spacing: calc((1 - var(--isTruncated)) * 0.03ch);
				}

				&:empty {
					font-size: calc(var(--isTruncated) * 1em);
					letter-spacing: calc(var(--isTruncated) * 0.03ch);

					opacity: var(--isTruncated);
					text-decoration: none;

					pointer-events: none;

					&:after {
						content: '⸱⸱⸱';
					}
				}
			}
		}

		&[data-format="visual-characters"] > span {
			vertical-align: baseline;

			&.middle {
				> span {
					--d: (
						1 - sin(var(--i) / (var(--l) - 1) * 180deg)
					);

					--x: (
						pow(
							var(--d),
							var(--isTruncated) * 2.5
						)
					);

					vertical-align: middle;

					font-size: calc(var(--x) * 1em);
					letter-spacing: calc(var(--x) * 0.03ch);

					transition-property: font-size;
					transition-duration: 0.2s;
				}
			}
		}
	}
</style>
