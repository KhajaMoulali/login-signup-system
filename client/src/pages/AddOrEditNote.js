import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { createNote, getNoteById, updateNoteById } from '../redux/actions/notesActionCreators';

const AddOrEditNote = ({ match, history, dispatchCreateNoteAction, dispatchGetNoteByIdAction, dispatchUpdateNoteAction }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState({ name: false, price: false, description: false });
    const { noteId } = match.params;

    useEffect(() => {
        const { noteId } = match.params;
        if (noteId) {
            dispatchGetNoteByIdAction(noteId, ({ name, price, description }) => {
                console.log("name, price, description==>", name, price, description);
                setName(name);
                setPrice(price);
                setDescription(description);
            });
        }
    }, [dispatchGetNoteByIdAction, match.params]);

    const handleOnSubmit = event => {
        event.preventDefault();
        if (isFormInvalid()) updateErrorFlags();
        else {
            const { noteId } = match.params;
            const data = { name, price, description };
            console.log("data in save==>", data);
            if (noteId) {
                dispatchUpdateNoteAction(noteId, data, () => {
                    toast.success('Note updated Successfully!');
                    history.replace('/notes');
                }, (message) => toast.error(`Error: ${message}`));
            } else {
                dispatchCreateNoteAction(data, () => {
                    toast.success('Note created Successfully!');
                    history.replace('/notes');
                }, (message) => toast.error(`Error: ${message}`));
            }
        }
    };

    const isFormInvalid = () => (!name.trim() || !price.trim());

    const updateErrorFlags = () => {
        const errObj = { name: false, price: false, description: false };
        if (!name.trim()) errObj.name = true;
        if (!price.trim()) errObj.price = true;
        setError(errObj);
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <h2>{noteId ? "Edit Note" : "Create Note"}</h2>
                </div>
            </div>
            <div className="row align-items-center mt-4">
                <div className="col-9">
                    <form noValidate onSubmit={handleOnSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input noValidate id="name"
                                type="text"
                                placeholder="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`form-control ${error.name ? 'is-invalid' : ''}`} />
                            <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">price</label>
                            <input noValidate id="price"
                                type="text"
                                placeholder="price"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className={`form-control ${error.price ? 'is-invalid' : ''}`} />
                            <p className="invalid-feedback">Required</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input noValidate id="description"
                                type="text"
                                placeholder="Description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control" />
                        </div>
                        <div className="mt-5">
                            <button type="submit" className="btn btn-primary mr-2 btn-lg">
                                Save | <i className="fas fa-save"></i>
                            </button>
                            <button type="button"
                                onClick={() => history.replace("/notes")}
                                className="btn btn-secondary btn-lg">
                                Cancel | <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => ({
    dispatchCreateNoteAction: (data, onSuccess, onError) =>
        dispatch(createNote(data, onSuccess, onError)),
    dispatchUpdateNoteAction: (noteId, data, onSuccess, onError) =>
        dispatch(updateNoteById(noteId, data, onSuccess, onError)),
    dispatchGetNoteByIdAction: (noteId, onSuccess) =>
        dispatch(getNoteById(noteId, onSuccess))
});
export default connect(null, mapDispatchToProps)(AddOrEditNote);
