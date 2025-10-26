import * as XLSX from 'xlsx';
import { formatDate } from './helpers';
import { DATE_FORMATS } from './constants';

/**
 * Export feedbacks to Excel
 */
export const exportFeedbacksToExcel = (feedbacks, filename = 'feedbacks') => {
  const data = feedbacks.map((feedback, index) => ({
    '#': index + 1,
    'Date': formatDate(feedback.created_at, DATE_FORMATS.DISPLAY_WITH_TIME),
    'Department': feedback.department,
    'Rating': feedback.rating_type,
    'Rating Value': feedback.rating_value,
    'NPS Score': feedback.nps_score,
    'Contact Email': feedback.contact?.email || 'N/A',
    'Contact Phone': feedback.contact?.phone || 'N/A',
    'Language': feedback.language,
    'Total Questions': feedback.answers?.length || 0,
  }));

  const ws = XLSX.utils.json_to_sheet(data);

  const colWidths = [
    { wch: 5 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 12 },
    { wch: 12 },
    { wch: 25 },
    { wch: 15 },
    { wch: 10 },
    { wch: 15 },
  ];
  ws['!cols'] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Feedbacks');

  const timestamp = formatDate(new Date(), 'yyyyMMdd_HHmmss');
  XLSX.writeFile(wb, `${filename}_${timestamp}.xlsx`);
};

/**
 * Export detailed feedback with answers
 */
export const exportDetailedFeedback = (feedback) => {
  const data = [
    { Field: 'Date', Value: formatDate(feedback.created_at, DATE_FORMATS.DISPLAY_WITH_TIME) },
    { Field: 'Department', Value: feedback.department },
    { Field: 'Rating Type', Value: feedback.rating_type },
    { Field: 'Rating Value', Value: feedback.rating_value },
    { Field: 'NPS Score', Value: feedback.nps_score },
    { Field: 'Email', Value: feedback.contact?.email || 'N/A' },
    { Field: 'Phone', Value: feedback.contact?.phone || 'N/A' },
    { Field: '', Value: '' },
    { Field: 'Question', Value: 'Answer' },
  ];

  feedback.answers?.forEach((answer) => {
    data.push({
      Field: answer.question_text,
      Value: Array.isArray(answer.answer) ? answer.answer.join(', ') : answer.answer,
    });
  });

  const ws = XLSX.utils.json_to_sheet(data);
  ws['!cols'] = [{ wch: 40 }, { wch: 60 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Feedback Details');

  const timestamp = formatDate(new Date(), 'yyyyMMdd_HHmmss');
  XLSX.writeFile(wb, `feedback_${feedback.id}_${timestamp}.xlsx`);
};