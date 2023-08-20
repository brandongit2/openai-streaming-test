import type {ReactElement, ReactNode} from "react"

import "./styles.css"

export const metadata = {
	title: `openai streaming test`,
}

export type AppLayoutProps = {
	children: ReactNode
}

export default function AppLayout({children}: AppLayoutProps): ReactElement | null {
	return (
		<html lang="en" className="h-full">
			<body className="h-full overflow-hidden">{children}</body>
		</html>
	)
}
