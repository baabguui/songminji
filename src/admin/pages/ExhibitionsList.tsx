import { useEffect, useState } from "react";
import { listExhibitions, deleteExhibition } from "admin/api/exhibitions";
import { ExhibitionRow } from "admin/interfaces";
import { PageTitle } from "admin/styles/FormStyles";
import { ListHeader, NewButton, Table, Th, Td, RowLink, DeleteLink } from "admin/styles/ListStyles";

const ExhibitionsList = () => {
  const [exhibitions, setExhibitions] = useState<ExhibitionRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await listExhibitions();
    setExhibitions(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Delete exhibition "${id}"? This also removes its images/PDF.`)) return;
    await deleteExhibition(id);
    load();
  };

  return (
    <div>
      <ListHeader>
        <PageTitle>Exhibitions</PageTitle>
        <NewButton to="/admin/exhibitions/new">+ New Exhibition</NewButton>
      </ListHeader>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Year</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {exhibitions.map((exhibition) => (
              <tr key={exhibition.id}>
                <Td>{exhibition.id}</Td>
                <Td>
                  <RowLink to={`/admin/exhibitions/${exhibition.id}/edit`}>
                    {exhibition.title}
                  </RowLink>
                </Td>
                <Td>{exhibition.year}</Td>
                <Td>
                  <DeleteLink onClick={() => handleDelete(exhibition.id)}>Delete</DeleteLink>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ExhibitionsList;
