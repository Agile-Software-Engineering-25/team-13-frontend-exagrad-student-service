import { useState } from 'react';
import { Box, Button } from '@mui/joy';
import LanguageSelectorComponent from '@components/LanguageSelectorComponent/LanguageSelectorComponent';
import { useTranslation } from 'react-i18next';
import StudentInfoHeader from '@/components/StudentInfoHeader/StudentInfoHeader';
import SemesterOverviewComponent from '@/components/SemesterOverviewComponent/SemesterOverviewComponent';
import ExamDatesModal from '@/components/Modals/ExamDatesModal/ExamDatesModal';
import ModuleOverviewComponent from '@/components/SemesterOverviewComponent/ModuleOverviewComponent';
import TmpThemeSelectorComponent from '@/components/TmpThemeSelectorComponent/TmpThemeSelectorComponent';
import generatePerformanceOverview, {
  downloadPdfFromDataUri,
} from '@/services/pdf/performanceOverviewGenerator';
import { Modal } from '@agile-software/shared-components';

const Home = () => {
  const { t } = useTranslation();

  const [viewExamDates, setViewExamDates] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<{
    id: number | null;
    titleKey: string | null;
  }>({ id: null, titleKey: null });
  const [generatedPdfDataUri, setGeneratedPdfDataUri] = useState('');
  const [showPdfModal, setShowPdfModal] = useState(false);

  const handleDownloadPerformanceOverview = () => {
    const url = generatePerformanceOverview();
    setGeneratedPdfDataUri(url);
    setShowPdfModal(true);
  };

  const handleClosePdfModal = () => {
    setShowPdfModal(false);
    setGeneratedPdfDataUri('');
  };

  const handleDownloadPdf = () => {
    const date = new Date().toISOString().slice(0, 10);
    downloadPdfFromDataUri(
      generatedPdfDataUri,
      `Leistungsuebersicht_${date}.pdf`
    );
  };

  return (
    <Box sx={{ paddingInline: 20, paddingBlock: 2, mx: 'auto' }}>
      <StudentInfoHeader />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 3,
          gap: 2,
        }}
      >
        <Button variant="outlined" onClick={() => setViewExamDates(true)}>
          {t('pages.home.buttons.viewExamDates')}
        </Button>

        <Button variant="solid" onClick={handleDownloadPerformanceOverview}>
          {t('pages.home.buttons.downloadPerformanceOverview')}
        </Button>
      </Box>

      <ExamDatesModal open={viewExamDates} setOpen={setViewExamDates} />
      <Modal
        open={showPdfModal}
        setOpen={setShowPdfModal}
        header="Leistungsübersicht"
      >
        <iframe
          src={generatedPdfDataUri}
          style={{ width: '100%', height: '500px' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
          <Button onClick={handleDownloadPdf}>Herunterladen</Button>
        </Box>
      </Modal>
      <Box sx={{ mt: 4 }}>
        {selectedSemester.id === null ? (
          <SemesterOverviewComponent
            setSelectedSemester={setSelectedSemester}
          />
        ) : (
          <ModuleOverviewComponent
            selectedSemester={selectedSemester}
            setSelectedSemester={setSelectedSemester}
          />
        )}
      </Box>
      <TmpThemeSelectorComponent />
      <LanguageSelectorComponent />
    </Box>
  );
};

export default Home;
