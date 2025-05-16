import { FC } from "react";
//Me falta el boton de ver =/, mierda.
interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionButtons: FC<Props> = ({ onEdit, onDelete }) => (
  <div className="btn-group">
    <button className="btn btn-warning btn-sm me-2"  onClick={onEdit}>
      Editar
    </button>
    <button className="btn btn-danger btn-sm" onClick={onDelete}>
      Eliminar
    </button>
  </div>
);
