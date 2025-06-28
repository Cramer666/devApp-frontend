interface Columna {
  label: string;
  key: string;
}

interface ActionButton<T> {
  label: string;
  color: string;
  onClick: (item: T) => void;
  disabled?: (item: T) => boolean;
  hidden?: (item: T) => boolean;
}

interface Props<T> {
  data: T[];
  columnas: Columna[];
  actions?: ActionButton<T>[];
  loading?: boolean;
  title?: string;
  showCreateButton?: boolean;
  onCreate?: () => void;
}

export const GenericList = <T extends { id?: string | number, _id?: string | number }>({
  data,
  columnas,
  actions = [],
  loading = false,
  title = "Lista",
  showCreateButton = false,
  onCreate
}: Props<T>) => (
  <div className="container mt-4">
    <div className="card">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h3 className="mb-0">{title}</h3>
        {showCreateButton && onCreate && (
          <button className="btn btn-success btn-sm" onClick={onCreate}>
            Agregar
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
                  {actions.length > 0 && <th>Acciones</th>}
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
                    {actions.length > 0 && (
                      <td>
                        <div className="d-flex gap-2">
                          {actions.map((action, index) => (
                            !action.hidden?.(item) && (
                              <button
                                key={index}
                                className={`btn btn-${action.color} btn-sm`}
                                onClick={() => action.onClick(item)}
                                disabled={action.disabled?.(item)}
                              >
                                {action.label}
                              </button>
                            )
                          ))}
                        </div>
                      </td>
                    )}
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