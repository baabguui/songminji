import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ExhibitionContainer,
  ExhibitionParagraph,
  ExhibitionContentImage,
  ScrollTop,
} from "styles/ExhibitionStyles";
import Modal from "components/Modal";
import { supabase } from "lib/supabaseClient";
import { formatPeriod } from "utils/period";

const Exhibition = () => {
  const { id } = useParams<{ id: string }>();
  const [exhibition, setExhibition] = useState<Exhibition>();
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [openImage, setOpenImage] = useState<ModalData | null>(null);

  const scrollTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowScrollTopButton = () => {
      const scrollThreshold = window.innerWidth < 768 ? 300 : 500; // 🔹 모바일(768px 이하)에서는 300px, 데스크톱에서는 500px

      if (window.scrollY > scrollThreshold) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener("scroll", handleShowScrollTopButton);
    return () => {
      window.removeEventListener("scroll", handleShowScrollTopButton);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [{ data: exhibitionRow, error: exhibitionError }, { data: contentRows, error: contentError }] =
          await Promise.all([
            supabase.from("exhibitions").select("*").eq("id", id).single(),
            supabase
              .from("exhibition_contents")
              .select("*")
              .eq("exhibition_id", id)
              .order("position"),
          ]);

        if (exhibitionError || contentError || !exhibitionRow) {
          console.error(exhibitionError ?? contentError);
          return;
        }

        const pdfUrl = exhibitionRow.pdf_storage_path
          ? supabase.storage.from("assets").getPublicUrl(exhibitionRow.pdf_storage_path)
              .data.publicUrl
          : undefined;

        const contents: ExhibitionContent[] = (contentRows ?? []).map((content) => ({
          category: content.category,
          imageUrl: supabase.storage.from("assets").getPublicUrl(content.storage_path).data
            .publicUrl,
          caption: content.caption ?? undefined,
        }));

        setExhibition({
          id: exhibitionRow.id,
          title: exhibitionRow.title,
          place: exhibitionRow.place,
          placeEn: exhibitionRow.place_en ?? undefined,
          periodStart: exhibitionRow.period_start ?? undefined,
          periodEnd: exhibitionRow.period_end ?? undefined,
          year: exhibitionRow.year,
          pdfUrl,
          pdfFilename: exhibitionRow.pdf_filename ?? undefined,
          contents,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (exhibition) {
    return (
      <Modal
        isOpen={openImage !== null}
        onClose={() => {
          setOpenImage(null);
        }}
        data={openImage}
      >
        <ExhibitionContainer>
          <ExhibitionParagraph style={{ marginLeft: "-0.4rem" }}>《{exhibition.title}》</ExhibitionParagraph>
          <ExhibitionParagraph>
            {exhibition.place}
            {exhibition.placeEn ? ` ${exhibition.placeEn}` : ""}
          </ExhibitionParagraph>
          {exhibition.periodStart && exhibition.periodEnd && (
            <ExhibitionParagraph>
              {formatPeriod(exhibition.periodStart, exhibition.periodEnd)}
            </ExhibitionParagraph>
          )}
          {exhibition.pdfUrl && (
            <a
              href={exhibition.pdfUrl}
              download={exhibition.pdfFilename ? `${exhibition.pdfFilename}.pdf` : undefined}
              style={{
                marginTop: "1vw",
                textDecoration: "none",
              }}
            >
              <ExhibitionParagraph style={{ color: "cadetblue" }}>
                {exhibition.pdfFilename}
              </ExhibitionParagraph>
            </a>
          )}
          <div style={{ marginBottom: "2vw" }} />
          {exhibition.contents.map((content, index) => (
            <ExhibitionContentImage
              key={index}
              src={content.imageUrl}
              category={content.category}
              onClick={() =>
                setOpenImage({
                  title: content.caption ?? "",
                  url: content.imageUrl,
                })
              }
            ></ExhibitionContentImage>
          ))}
          {showScrollTopButton && (
            <ScrollTop onClick={scrollTop}>Top</ScrollTop>
          )}
        </ExhibitionContainer>
      </Modal>
    );
  }
};

export default Exhibition;
