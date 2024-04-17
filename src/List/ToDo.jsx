import React, { useEffect, useState } from 'react';
import "./ToDo.scss";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

// to get the data from Local Storage
const getLocalItems = () => {
    let listed = localStorage.getItem('lists');
    if (listed) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const ToDo = () => {
    const [data, setData] = useState('');
    const [list, setListItem] = useState(getLocalItems());
    const [toggleBtn, setToggleBtn] = useState(true);
    const [isEdit, setIsEdit] = useState(null);

    const inputEvent = () => {
        if (!data) {
            alert("Please Enter Something!!")
        } else if (data && !toggleBtn) {
            setListItem(
                list.map((elem) => {
                    if (elem.id === isEdit) {
                        return { ...elem, name: data }
                    }
                    return elem;
                })

            )
            setToggleBtn(true);

            setData('');

            setIsEdit(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: data }
            setListItem([...list, allInputData]);
            setData("");
        }
    }
    const deleteList = (index) => {
        const updated = list.filter((elem) => {
            return index !== elem.id;
        });
        setListItem(updated);
    }

    // edit function
    const editItems = (id) => {
        let newEditItem = list.find((elem) => {
            return elem.id === id;
        });

        setToggleBtn(false);

        setData(newEditItem.name);

        setIsEdit(id);
    }



    // add data to localStorage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(list))
    }, [list]);


    return (
        <div className="container">
            <header className="group-design text-center text-light my-4">
                <h1 className="mb-4 heading">Todo List</h1>
            </header>
            <div className="group-design text-center text-light my-4">
                <div className="group d-flex">
                    <input className="form-control m-auto inputData" type="text" value={data} onChange={(e) => { setData(e.target.value) }} name="add" placeholder='Add a new todo...' />
                    <button className="btn btn-light" onClick={inputEvent}>

                        {toggleBtn ? <i className="fa fa-plus" title='Add a list' aria-hidden="true"></i> :
                            <i className="fa-regular fa-pen-to-square" title='Update a list' aria-hidden="true"></i>}

                    </button>
                </div>
            </div>
            <br />
            {list.map((elem) => {
                return (
                    <div className="list-group todos mx-auto my-2 text-light delete" key={elem.id}>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{elem.name}</span>
                            <div>
                                <i className="fa-regular fa-pen-to-square edit" onClick={() => editItems(elem.id)} title='Edit List'></i>
                                <i className="far fa-trash-alt delete" onClick={() => deleteList(elem.id)} title='Delete List'></i>
                            </div>
                        </div>

                    </div>
                );
            })}




        </div>


    );
}

export default ToDo;
