import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarSorter = () => {
    const [models, setModels] = useState([]);
    const [sortedModels, setSortedModels] = useState([]);
    const [sortKey, setSortKey] = useState('make_id'); // Default sorting key
    const [selectedMake, setSelectedMake] = useState('ac'); // Default make
    const [selectedModel, setSelectedModel] = useState(null); // Track the selected model for detailed information
    const [modelDetails, setModelDetails] = useState(null); // Detailed information about the selected model

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get(`/api/0.3/?callback=?&cmd=getModels&make=${selectedMake}`);
                // Extracting JSON from the callback structure
                const jsonData = JSON.parse(response.data.substring(2, response.data.length - 2));
                console.log(jsonData);
                if (jsonData && jsonData.Models) {
                    setModels(jsonData.Models);
                    setSortedModels(jsonData.Models);
                } else {
                    console.error('Invalid response data:', jsonData);
                }
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };

        fetchModels();
    }, [selectedMake]);

    

    const sortModels = (key) => {
        const isDescending = sortKey === key && !sortedModels[0]._desc;
        const sorted = [...sortedModels].sort((a, b) => {
            if (a[key] < b[key]) return isDescending ? 1 : -1;
            if (a[key] > b[key]) return isDescending ? -1 : 1;
            return 0;
        });

        // Add metadata to indicate sorting order
        sorted._desc = !isDescending;

        setSortedModels(sorted);
        setSortKey(key);
    };

    const handleMakeChange = (event) => {
        setSelectedMake(event.target.value);
        setSelectedModel(null);
    };

    const showModelDetails = async (model) => {
        try {
            const response = await axios.get(`/api/0.3/?callback=?&cmd=getTrims&model=${model.model_name}`);
            // Extracting JSON from the callback structure
            const jsonData = JSON.parse(response.data.substring(2, response.data.length - 2));
            console.log(jsonData);
            if (jsonData && jsonData.Trims) {
                setModelDetails(jsonData.Trims);
            } else {
                console.error('Invalid response data:', jsonData);
            }
        } catch (error) {
            console.error('Error fetching model details:', error);
        }

        setSelectedModel(model);
    };

    const showCarList = () => {
        setSelectedModel(null);
        setModelDetails(null);
    };

    return (
        <div className='absolute left-1/2 -translate-x-1/2 text-center'>
            {!selectedModel && (
                <>
                    <h1 className='text-8xl uppercase font-bold'>Car List</h1>
                    <label htmlFor="makeSelect" className="text-lg font-semibold mb-2">Select Car: </label>
                    <select id="makeSelect" value={selectedMake} onChange={handleMakeChange} className="mb-4">
                        <option value="ac">AC</option>
                        <option value="acura">Acura</option>
                        <option value="alfa-romeo">Alfa Romeo</option>
                        <option value="alpina">Alpina</option>
                        <option value="ariel">Ariel</option>
                        <option value="ascari">Ascari</option>
                        <option value="aston-martin">Aston Marton</option>
                        <option value="audi">Audi</option>
                        <option value="beijing">Beijing</option>
                        <option value="bentley">Bentley</option>
                        <option value="bizzarrini">Bizzarrini</option>
                        <option value="bmw">BMW</option>
                        <option value="bristol">Bristol</option>
                        <option value="Bugatti">Bugatti</option>
                        <option value="buick">Buick</option>
                        <option value="cadillac">Cadillac</option>
                        <option value="caterham">Caterham</option>
                        <option value="chevrolet">Chevrolet</option>
                        <option value="chrysler">Chrysler</option>
                        <option value="citroen">Citroen</option>
                        <option value="daewoo">Daewoo</option>
                        <option value="daihatsu">Daihatsu</option>
                        <option value="de-tomaso">De Tomaso</option>
                        <option value="dodge">Dodge</option>
                        <option value="donkervoort">Donkervoort</option>
                        <option value="eagle">Eagle</option>
                        <option value="ferrari">Ferrari</option>
                        <option value="fiat">Fiat</option>
                        <option value="ford">Ford</option>
                        <option value="gaz">Gaz</option>
                        <option value="ginetta">Ginetta</option>
                        <option value="gmc">Gaylord (GMC)</option>
                        <option value="holden">Holden</option>
                        <option value="honda">Honda</option>
                        <option value="hummer">Hummer</option>
                        <option value="hyundai">Hyundai</option>
                        <option value="infiniti">Infiniti</option>
                        <option value="isuzu">Isuzu</option>
                        <option value="jaguar">Jaguar</option>
                        <option value="jeep">Jeep</option>
                        <option value="jensen">Jensen</option>
                        <option value="kia">Kia</option>
                        <option value="koenigsegg">Koenigsegg</option>
                        <option value="lada">Lada</option>
                        <option value="lamborghini">Lamborghini</option>
                        <option value="lancia">Lancia</option>
                        <option value="land-rover">Land Rover</option>
                        <option value="lexus">Lexus</option>
                        <option value="lincoln">Lincoln</option>
                        <option value="lotec">Lotec</option>
                        <option value="lotus">Lotus</option>
                        <option value="mahindra">Mahindra</option>
                        <option value="marcos">Marcos</option>
                        <option value="metra-simca">Metra-Simca</option>
                        <option value="mazda">Mazda</option>
                        <option value="mcc">MCC</option>
                        <option value="mercedes-benz">Mercedes</option>
                        <option value="mercury">Mercury</option>
                        <option value="mini">Mini</option>
                        <option value="mitsubishi">Mitsubishi</option>
                        <option value="morgan">Morgan</option>
                        <option value="nissan">Nissan</option>
                        <option value="noble">Noble</option>
                        <option value="oldsmobile">Oldsmobile</option>
                        <option value="opel">Opel</option>
                        <option value="pagani">Pagani</option>
                        <option value="panoz">Panoz</option>
                        <option value="peugeot">Peugeot</option>
                        <option value="pininfarina">Pininfarina</option>
                        <option value="plymouth">Plymouth</option>
                        <option value="pontiac">Pontiac</option>
                        <option value="porsche">Porsche</option>
                        <option value="proton">Proton</option>
                        <option value="renault">Renault</option>
                        <option value="riley">Riley</option>
                        <option value="rolls-royce">Rolls-Royce</option>
                        <option value="rover">Rover</option>
                        <option value="saab">Saab</option>
                        <option value="saleen">Saleen</option>
                        <option value="samsung">Samsung</option>
                        <option value="saturn">Saturn</option>
                        <option value="seat">Seat</option>
                        <option value="skoda">Skoda</option>
                        <option value="smart">Smart</option>
                        <option value="ssangyong">Ssangyong</option>
                        <option value="subaru">Subaru</option>
                        <option value="suzuki">Suzuki</option>
                        <option value="tata">Tata</option>
                        <option value="toyota">Toyota</option>
                        <option value="tvr">TVR</option>
                        <option value="vauxhall">Vauxhall</option>
                        <option value="vector">Vector</option>
                        <option value="venturi">Venturi</option>
                        <option value="volkswagen">Volkswagen</option>
                        <option value="volvo">Volvo</option>
                        <option value="westfield">Westfield</option>
                        <option value="zaz">Zaz</option>
                        {/* Add more options as needed */}
                    </select>
                    <table className='flex flex-col absolute left-1/2 -translate-x-1/2 w-[420px]'>
                        <thead>
                            <tr className='flex justify-between'>
                                <th onClick={() => sortModels('model_name')}>Brand</th>
                                <th onClick={() => sortModels('model_make_id')}>Make ID</th>
                                <th>Details</th> {/* New column for the details button */}
                                {/* Add more table headers as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedModels.map((model, index) => (
                                <tr key={index} className='uppercase flex justify-between'>
                                    <td className='text-left w-[140px]'>{model.model_name}</td>
                                    <td className='text-center w-[140px]'>{model.model_make_id}</td>
                                    <td className='text-end w-[140px]'>
                                        <button onClick={() => showModelDetails(model)}>Details</button>
                                    </td>
                                    {/* Add more table cells as needed */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            {selectedModel && (
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold">Details for <span className='uppercase'>{selectedModel.model_make_id}</span> {selectedModel.model_name}</h2>
                    {modelDetails ? (
                        <div>
                            <div className='flex justify-between'>
                                <p>Trim Name:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_trim}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Model Year:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_year}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Engine Position:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_engine_position}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Engine CC:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_engine_cc}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Engine Cylinders:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_engine_cyl}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Valves Per Cylinders:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_engine_valves_per_cyl}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Engine Type:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_engine_type}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Horse Power:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_engine_power_ps}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Torque:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_engine_torque_nm}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Fuel Type:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_engine_fuel}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Top Speed (kph):</p>
                                <p className='font-bold underline'>{modelDetails[0].model_top_speed_kph}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>0-100 (kph):</p>
                                <p className='font-bold underline'>{modelDetails[0].model_0_to_100_kph}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Drive Train:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_drive}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Transmission Type:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_transmission_type}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Seats:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_seats}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Doors:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_doors}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Weight:</p>
                                <p className='font-bold underline'>{modelDetails[0].model_weight_kg}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Lenght (mm):</p>
                                <p className='font-bold underline'>{modelDetails[0].model_length_mm}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Width (mm):</p>
                                <p className='font-bold underline'>{modelDetails[0].model_width_mm}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Height (mm):</p>
                                <p className='font-bold underline'>{modelDetails[0].model_height_mm}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading details...</p>
                    )}
                    <button onClick={showCarList}>Back to Car List</button>
                </div>
            )}
        </div>
    );
};

export default CarSorter;
