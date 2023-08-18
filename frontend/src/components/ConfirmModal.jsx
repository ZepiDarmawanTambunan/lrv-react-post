import React from "react";

function ConfirmModal({ show, onClose, onConfirm }) {
    return (
        <div className={`modal ${show ? "d-block" : ""}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Konfirmasi Hapus</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Anda yakin ingin menghapus ini?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Batal</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Hapus</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;