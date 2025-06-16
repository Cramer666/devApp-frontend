interface Columna {
  label: string;
  key: string;
}

interface Props<T> {
  data: T[];
  columnas: Columna[];
  onVer?: (item: T) => void;
  onEditar?: (item: T) => void;
  onEliminar?: (item: T) => void;
  loading?: boolean;
  title?: string;
  onCreate?: () => void;
}

export const GenericList = <T extends { id?: string | number; _id?: string | number }>({
  data,
  columnas,
  onVer,
  onEditar,
  onEliminar,
  loading = false,
  title = "Lista",
  onCreate,
}: Props<T>) => (
  <div className="container mt-4">
    <div className="card">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h3 className="mb-0">{title}</h3>
        {onCreate && (
          <button className="btn btn-light btn-sm" onClick={onCreate}>
            + Nuevo
          </button>
        )}
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  {columnas.map((col) => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={String(item.id ?? item._id)}>
                    {columnas.map((col) => (
                      <td key={col.key}>
                        {String(item[col.key as keyof T])}
                      </td>
                    ))}
                    <td>
                      <div className="d-flex gap-2">
                        {onVer && (
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => onVer(item)}
                          >
                            Ver
                          </button>
                        )}
                        {onEditar && (
                          <button
                            className="btn btn-warning btn-sm text-white"
                            onClick={() => onEditar(item)}
                          >
                            Editar
                          </button>
                        )}
                        {onEliminar && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => onEliminar(item)}
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </div>
);
