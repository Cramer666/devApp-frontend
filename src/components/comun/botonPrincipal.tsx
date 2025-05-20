import { FC } from "react";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

export const ActionButtons: FC<Props> = ({ onEdit, onDelete, onView }) => (
  <div className="btn-group">
    <button className="btn btn-info btn-sm me-2" onClick={onView}>
      Ver
    </button>
    <button className="btn btn-warning btn-sm me-2" onClick={onEdit}>
      Editar
    </button>
    <button className="btn btn-danger btn-sm" onClick={onDelete}>
      Eliminar
    </button>
  </div>
);