function Wrapper() {
    return (
        <div className="bg-gray-200 hidden lg:w-8/12 lg:flex">
        <picture>
        <source srcSet="/wrapper.webp" />
            <img fetchpriority="high" src="/wrapper.jpg" width={'100%'} height={'100%'} alt="https://www.pexels.com/photo/gray-wooden-computer-cubicles-inside-room-267507/" className="object-cover flex justify-center align-middle items-center min-h-screen image-full bg-cover bg-no-repeat" />
        </picture>      
        </div>
    )
}

export default Wrapper;