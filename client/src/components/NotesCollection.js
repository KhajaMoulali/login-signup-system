import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteNoteById } from './../redux/actions/notesActionCreators';
import Pagination from 'react-js-pagination';
import '../../node_modules/bootstrap-less';

const NotesCollection = ({ notes, dispatchDeleteAction }) => {
    console.log("all notes==>", notes);
    const notesPerPage = 2;
    const [data, setData] = useState(notes);
    const [ascending, setAscending] = useState(false);
    const [selectedNote, setSelectedNote] = useState('');
    const [searchString, setSearchString] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastNote  = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes     = data.slice( indexOfFirstNote, indexOfLastNote );


    const showConfirmationModal = (event, noteId) => {
        event.preventDefault();
        setSelectedNote(noteId);
        window.$('#confirmationModal').modal('show');
    };

    useEffect(() => {
        setData(notes);
    }, [notes])

    const handlePageChange = numPage => {
        setCurrentPage(numPage);
    };

    const compareBy = (key) => {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    const sortById = (key) => {
        setAscending(!ascending);
        if (ascending) {
            let notesCopy = [...data];
            notesCopy.sort(compareBy(key));
            setData(notesCopy);
        } else {
            let notesCopy = [...data];
            notesCopy.sort(compareBy(key));
            setData(notesCopy.reverse());
        }
    }

    const handleOnDelete = () => {
        dispatchDeleteAction(selectedNote, () => {
            window.$('#confirmationModal').modal('hide');
            toast.success('Note deleted Successfully!');
        }, (message) => {
            window.$('#confirmationModal').modal('hide');
            toast.error(`Error: ${message}`);
        });
    };

    const filteredNotes = currentNotes.filter((note) =>
        note.name.toLowerCase().includes(searchString.toLowerCase())
    )

    return (
        <React.Fragment>
            <input type="text" value={searchString} placeholder="Search Item/Note" onChange={(e) => setSearchString(e.target.value)} className="form-control" />
            <br />
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th onClick={() => sortById("name")}>Name <i className="fa fa-arrows-v"></i></th>
                        <th onClick={() => sortById("price")}>Price <i className="fa fa-arrows-v"></i></th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredNotes.map(item => (
                            <tr key={item._id}>
                                <td>
                                    <Link to={`/edit-note/${item._id}`}>
                                        {item.name}
                                    </Link>
                                </td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                    <a href="/" onClick={(e) => showConfirmationModal(e, item._id)}>
                                        <i className="fas fa-trash-alt fa-2x text-danger"></i>
                                    </a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="pagination">
            <Pagination
               activePage={ currentPage }
               itemsCountPerPage={ 2 }
               totalItemsCount={ data.length }
               pageRangeDisplayed={ 2 }
               onChange={ handlePageChange }
            />
            </div>
            <Modal handleOnDelete={handleOnDelete} />
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchDeleteAction: (noteId, onSuccess, onError) =>
        dispatch(deleteNoteById(noteId, onSuccess, onError))
});
export default connect(null, mapDispatchToProps)(NotesCollection);

const Modal = ({ handleOnDelete }) => (
    <div className="modal" id="confirmationModal" tabIndex="-1" role="dialog">
        <div role="document" className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure, you want to delete this note ?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" data-dismiss="modal" className="btn btn-secondary">
                        No
                    </button>
                    <button type="button" data-dismiss="modal" onClick={handleOnDelete} className="btn btn-primary">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    </div>
);
