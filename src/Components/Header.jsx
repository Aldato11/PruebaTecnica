import React from 'react'

const Header = ({setLocation, handleClick, location}) => {
    // Se valida si el dato ingresado es de tipo numerico
    const validateKeyPress = (e) => {
        var key = window.event ? e.which : e.keyCode;
        if (
            key !== 46 &&
            key !== 37 && 
            key !== 39 && 
            (key > 31 && (key < 48 || key > 57))
        ) {
            e.preventDefault();
        }
    };
    
    return (
        // Se le pide el id de localizacion al usuario
        <div className='bg-gray-800'>
            <div className='flex justify-between  items-center container '>
                <h1 className='text-white text-2xl'>Rick And Morty</h1>
                <div className='flex justify-end m-5 gap-1 rounded-md overflow-hidden ring-indigo-500/50 ring-offset-[3px] focus-within:ring-2
                    ring-offset-gray-800 transition-all duration-500 '>
                    <input
                    pattern={/^[0-9]+$/}
                    type='text'
                    placeholder='id localización'
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className='bg-indigo-200 !outline-none pl-3 py-2 font-semibold '
                    onKeyDown={validateKeyPress}
                    />

                    <button
                    disabled={Number(location) === 0 ? true : false}
                    value='Buscar'
                    onClick={handleClick}
                    className={`bg-indigo-500 hover:bg-indigo-500/80 transition-all cursor-pointer text-indigo-100 py-2 px-4 ${Number(location) === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    )
}


export default Header;