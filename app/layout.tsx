
import "./globals.css";


export const metadata = {
    title: "F1GPT",
    description: "the place to go for all your Formula 1 questions"
};

const RootLayout = ( { children }: { children : React.ReactNode} ) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

export default RootLayout;