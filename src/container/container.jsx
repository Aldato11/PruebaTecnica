import React, { useMemo, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Spinner from '../components/Spinner'
import Header from '../components/Header'
import Cards from '../components/Cards'

const Container = () => {

    // Se crea hooks para la informacion
    const [residents, setResidents] = useState([])
    const [location, setLocation] = useState('')
    const [color, setColor] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // Se valida el rango del id para cambiar el color del fondo
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


    const handleClick = async () => {
        let dataTransform = []
        setLoading(true)
        setError(false)
        try {
            // Se consulta la API
            const { data } = await axios(`https://rickandmortyapi.com/api/location/${location}`)

            // Se crea un nuevo Array mediante una Promesa
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
        
            // Se valida si la peticion tiene resultado, en caso de que no se manda una alerta
            if (!data.residents.length) {
                setColor('bg-white min-h-screen')
                Swal.fire({
                    icon: 'info',
                    title: 'Oops...',
                    text: 'No se encontraron residentes',
                })
            }else{
                changeColor()
            }
            setResidents(dataTransform)
            setLoading(false)
        } catch (error) {
            setColor('bg-white min-h-screen')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error!',
            })
            setError(true)
        }
    }
   
    // Funcion para ordenar alfabeticamente los personajes
    const dataOrder = useMemo(()=>{
        return residents.sort((a,b) => a.info.name.localeCompare(b.info.name))  
    },[residents])


    return (
        // Se cargan los diferentes componentes
        <div className={color}>
            <Header setLocation={setLocation} handleClick={handleClick} location={location}/>
            {!error && (
                <>
                    <Spinner spinner={loading} />
                    {!loading &&
                    <div className=' grid grid-cols-2 md:grid-cols-3 gap-5 container py-10  w-80 md:w-auto'>
                        {dataOrder.map(resident => (
                            <div className='border-2 border-gray-200 bg-gray-600 text-gray-300 max-w-xl rounded-2xl overflow-hidden'>
                                <Cards resident={resident} />
                            </div>
                        ))}
                    </div>
                    }
                </>
            )}
        </div>
    )
}


export default Container;