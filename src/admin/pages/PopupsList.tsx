import { useEffect, useState } from "react";
import { listPopups, deletePopup, getPublicUrl } from "admin/api/popups";
import { PopupRow } from "admin/interfaces";
import { PageTitle } from "admin/styles/FormStyles";
import { ListHeader, NewButton, Table, Th, Td, RowLink, DeleteLink } from "admin/styles/ListStyles";

const PopupsList = () => {
  const [popups, setPopups] = useState<PopupRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await listPopups();
    setPopups(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this popup?")) return;
    await deletePopup(id);
    load();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <ListHeader>
        <PageTitle>Popups</PageTitle>
        <NewButton to="/admin/popups/new">+ New Popup</NewButton>
      </ListHeader>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Image</Th>
              <Th>Period</Th>
              <Th>Status</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {popups.map((popup) => {
              const active = popup.start_date <= today && today <= popup.end_date;
              return (
                <tr key={popup.id}>
                  <Td>
                    <RowLink to={`/admin/popups/${popup.id}/edit`}>
                      <img
                        src={getPublicUrl(popup.storage_path)}
                        alt=""
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                    </RowLink>
                  </Td>
                  <Td>
                    {popup.start_date} ~ {popup.end_date}
                  </Td>
                  <Td>{active ? "노출중" : "비노출"}</Td>
                  <Td>
                    <DeleteLink onClick={() => handleDelete(popup.id)}>Delete</DeleteLink>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default PopupsList;
