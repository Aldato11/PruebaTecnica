import React, { useState } from 'react'

const Cards = ({ resident }) => {

    const { name, status, specie, nameOrigin, image, episodios } = resident.info
    const [modal, setModal] = useState(false)

    const handleModal = () => {
        setModal(true)
    }

    return (
        <>
            <div>
                <img src={image} alt={image} onClick={handleModal}
                    className='cursor-pointer  w-full  md:h-auto transition-all hover:scale-105 '
                />
                <h3 className='text-xl font-bold text-center p-5 '>{name}</h3>
            </div>

            {
                modal && (
                    <div className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'>
                        <div className='bg-gray-800 text-gray-300 max-w-xl rounded-2xl overflow-hidden'>
                            <img src={image} alt="" onClick={() => setModal(false)}
                                className='cursor-pointer w-full h-auto'
                            />

                            <div className='px-6 py-6 '>
                                <h2 className='text-xl font-bold text-center'>{name}</h2>

                                <p > <span className='font-bold'>Status:</span> {status}</p>
                                <p > <span className='font-bold'>Specie:</span> {specie}</p>
                                <p > <span className='font-bold'>Origin:</span> {nameOrigin}</p>
                                <ul>
                                    <p className='font-bold'>Episodios:</p>
                                    {episodios.map(element => (
                                        <li>{element}</li>
                                    ))}
                                </ul>
                                <button className='bg-indigo-500 px-5 py-2 rounded-lg mt-5 ml-auto block hover:bg-indigo-400'
                                onClick={() => setModal(false)}> Cerrar</button>
                            </div>

                        </div>

                    </div>
                )
            }

        </>

    )
}

export default Cards