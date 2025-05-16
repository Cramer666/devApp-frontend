// hooks/useAutosWithOwners.ts
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AutoConDuenio } from '../models/autoDuenio';

export function useAutosWithOwners() {
  const [data, setData] = useState<AutoConDuenio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargar = () => {
    setLoading(true);
    axios
      .get<AutoConDuenio[]>('http://localhost:3000/autos/withOwners') // <-- tu endpoint real
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar autos');
        setLoading(false);
      });
  };

  useEffect(() => {
    cargar();
  }, []);

  return { data, loading, error, cargar };
}
