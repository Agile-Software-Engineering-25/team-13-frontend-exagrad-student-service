import { Typography, Box, Divider, Chip } from '@mui/joy';
import { Modal } from '@agile-software/shared-components';
import { useTranslation } from 'react-i18next';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';

type ExamDetailsModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  exam: {
    assessmentTyp: string;
    moduleCode: string;
    date: string;
    weight: string;
    room?: string;
    maxPoints?: number;
    duration?: number;
    tools?: string[];
  } | null;
};

const ExamDetailsModal = ({ open, setOpen, exam }: ExamDetailsModalProps) => {
  const { t } = useTranslation();

  if (!exam) return null;

  return (
    <Modal
      header={t('components.examDetailsModal.title')}
      open={open}
      setOpen={setOpen}
      modalDialogSX={{ maxWidth: 600, width: '90%' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography level="body-sm" sx={{ color: 'text.secondary', mb: 0.5 }}>
            {t('components.examDetailsModal.moduleCode')}
          </Typography>
          <Typography level="body-md" fontWeight="lg">
            {exam.moduleCode}
          </Typography>
        </Box>

        <Box>
          <Typography level="body-sm" sx={{ color: 'text.secondary', mb: 0.5 }}>
            {t('components.examDetailsModal.type')}
          </Typography>
          <Typography level="body-md" fontWeight="lg">
            {exam.assessmentTyp}
          </Typography>
        </Box>

        <Box>
          <Typography level="body-sm" sx={{ color: 'text.secondary', mb: 0.5 }}>
            {t('components.examDetailsModal.date')}
          </Typography>
          <Typography level="body-md" fontWeight="lg">
            {exam.date}
          </Typography>
        </Box>

        <Box>
          <Typography level="body-sm" sx={{ color: 'text.secondary', mb: 0.5 }}>
            {t('components.examDetailsModal.weight')}
          </Typography>
          <Typography level="body-md" fontWeight="lg">
            {exam.weight}
          </Typography>
        </Box>

        {exam.room && (
          <>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnOutlinedIcon color="primary" />
              <Box>
                <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                  {t('components.examDetailsModal.room')}
                </Typography>
                <Typography level="body-md" fontWeight="lg">
                  {exam.room}
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {exam.maxPoints !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GradeOutlinedIcon color="primary" />
            <Box>
              <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                {t('components.examDetailsModal.maxPoints')}
              </Typography>
              <Typography level="body-md" fontWeight="lg">
                {exam.maxPoints}
              </Typography>
            </Box>
          </Box>
        )}

        {exam.duration !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimerOutlinedIcon color="primary" />
            <Box>
              <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                {t('components.examDetailsModal.duration')}
              </Typography>
              <Typography level="body-md" fontWeight="lg">
                {exam.duration} {t('components.examDetailsModal.minutes')}
              </Typography>
            </Box>
          </Box>
        )}

        {exam.tools && exam.tools.length > 0 && (
          <>
            <Divider sx={{ my: 1 }} />
            <Box>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <BuildOutlinedIcon color="primary" />
                <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                  {t('components.examDetailsModal.tools')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {exam.tools.map((tool, index) => (
                  <Chip key={index} variant="soft" color="primary">
                    {tool}
                  </Chip>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ExamDetailsModal;
