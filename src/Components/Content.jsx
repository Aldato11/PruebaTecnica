import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import axios from 'axios'
import Swal from 'sweetalert2'
import Spinner from './Spinner'

const Content = () => {

    const [residents, setResidents] = useState([])
    const [location, setLocation] = useState('')
    const [color, setColor] = useState('')
    const [spinner, setSpinner] = useState(false)

    const handleClick = async () => {
        let dataTransform = []

        if (location === '' || location == 0) {
            console.log('No hay una localización');
            setColor('bg-white min-h-screen')
            setResidents([])

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay una Localización!',
            })

            return
        }
        setSpinner(true)
        try {
            const { data } = await axios(`https://rickandmortyapi.com/api/location/${location}`)

            await Promise.all(
                data.residents.slice(0, 5).map(async (element) => {
                    const dataResponse = await axios(element)
                    dataTransform.push({
                        urlCharacters: element,
                        info: {
                            name: dataResponse.data.name,
                            status: dataResponse.data.status,
                            specie: dataResponse.data.species,
                            nameOrigin: dataResponse.data.origin.name,
                            image: dataResponse.data.image,
                            episodios: dataResponse.data.episode.slice(0, 3)
                        }
                    })
                }
                )
            )

            setResidents(dataTransform)
            if (!residents == []) {
                setSpinner(false)
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error!',
            })
        }
    }



    useEffect(() => {
        const changeColor = () => {
            if (location == '' || location == 0) {
                setColor('bg-white min-h-screen')
            }
            if (location > 0 && location < 51) {
                setColor('bg-red-600 min-h-screen')
            }
            if (location > 50 && location < 80) {
                setColor('bg-blue-600 min-h-screen')
            }
            if (location > 80) {
                setColor('bg-green-600 min-h-screen')
            }
        }
        changeColor()
    }, [residents])


    return (
        <>
            <div className={color}>

                <div className='bg-gray-800'>
                    <div className='flex justify-between  items-center container '>
                        <h1 className='text-white text-2xl'>Rick And Morty</h1>
                        <div className='flex justify-end m-5 gap-1 rounded-md overflow-hidden ring-indigo-500/50 ring-offset-[3px] focus-within:ring-2
                            ring-offset-gray-800 transition-all duration-500 w-[230.6px]'>
                            <input
                                type='text'
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                className='bg-indigo-200 !outline-none pl-3 py-2 font-semibold '
                            />

                            <button
                                value='Buscar'
                                onClick={handleClick}
                                className='bg-indigo-500 hover:bg-indigo-500/80 transition-all cursor-pointer text-indigo-100'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>

                <Spinner
                    spinner={spinner}
                />

                <div className=' grid grid-cols-2 md:grid-cols-3 gap-5 container py-10  w-80 md:w-auto'>
                    {residents.map(resident => (
                        <div className='border-2 border-gray-200 bg-gray-600 text-gray-300 max-w-xl rounded-2xl overflow-hidden'>
                            <Cards
                                resident={resident}
                            />
                        </div>

                    ))}
                </div>
            </div>

        </>
    )
}


export default Content