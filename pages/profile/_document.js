export default function App({ Component, pageProps }) {
    return <>
        <div className='flex'>
            <h1 className='w-1/4'>Sidebar</h1>
            <div className='w-3/4'>
                <Component {...pageProps} />;

            </div>
        </div>
    </>
}