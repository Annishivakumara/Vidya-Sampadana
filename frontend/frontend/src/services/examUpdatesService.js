import API from "./api";

export const EXAM_CATEGORIES = [
  { value: "ALL", label: "All Categories" },
  { value: "ADMIT_CARD", label: "Admit Card" },
  { value: "EXAM_DATE", label: "Exam Dates" },
  { value: "SYLLABUS", label: "Syllabus" },
  { value: "ANSWER_KEY", label: "Answer Key" },
  { value: "RESULT", label: "Results" },
  { value: "CUTOFF", label: "Cutoff Ranks" },
  { value: "COUNSELLING", label: "Counselling" },
  { value: "GENERAL", label: "General Notice" },
];

export const CATEGORY_LABELS = {
  ADMIT_CARD: "Admit Card",
  RESULT: "Results",
  SYLLABUS: "Syllabus",
  CUTOFF: "Cutoff Ranks",
  COUNSELLING: "Counselling",
  EXAM_DATE: "Exam Date",
  ANSWER_KEY: "Answer Key",
  GENERAL: "General Notice",
};

/**
 * Normalizes a KCET update item from KcetUpdateResponse:
 * { id, title, description, category, isActive, createdAt }
 */
export const normalizeKcetUpdate = (item) => ({
  id: `kcet-${item.id}`,
  rawId: item.id,
  exam: "KCET",
  serviceName: "KCET Updates Service",
  title: item.title || "Untitled KCET Notification",
  description: item.description || "",
  category: item.category || "GENERAL",
  categoryLabel: CATEGORY_LABELS[item.category] || item.category || "General",
  isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
  isPinned: false,
  sourceUrl: null,
  createdAt: item.createdAt || null,
  updatedAt: null,
});

/**
 * Normalizes a NEET update item from NeetUpdateResponse:
 * { id, title, description, sourceUrl, category, isPinned, createdAt, updatedAt }
 */
export const normalizeNeetUpdate = (item) => ({
  id: `neet-${item.id}`,
  rawId: item.id,
  exam: "NEET",
  serviceName: "NEET Updates Service",
  title: item.title || "Untitled NEET Notification",
  description: item.description || "",
  category: item.category || "GENERAL",
  categoryLabel: CATEGORY_LABELS[item.category] || item.category || "General",
  isActive: true,
  isPinned: Boolean(item.isPinned),
  sourceUrl: item.sourceUrl || null,
  createdAt: item.createdAt || null,
  updatedAt: item.updatedAt || null,
});

/**
 * Fetch all active KCET updates
 * Verified Spring Boot endpoint: GET /api/kcet-updates
 */
export const getKcetUpdates = async () => {
  const response = await API.get("/kcet-updates");
  const list = Array.isArray(response.data) ? response.data : [];
  return list.map(normalizeKcetUpdate);
};

/**
 * Fetch KCET updates by KcetCategory enum
 * Verified Spring Boot endpoint: GET /api/kcet-updates/category/{category}
 */
export const getKcetUpdatesByCategory = async (category) => {
  if (!category || category === "ALL") {
    return getKcetUpdates();
  }
  const response = await API.get(`/kcet-updates/category/${encodeURIComponent(category)}`);
  const list = Array.isArray(response.data) ? response.data : [];
  return list.map(normalizeKcetUpdate);
};

/**
 * Fetch all active NEET updates
 * Verified Spring Boot endpoint: GET /api/neet-updates
 */
export const getNeetUpdates = async () => {
  const response = await API.get("/neet-updates");
  const list = Array.isArray(response.data) ? response.data : [];
  return list.map(normalizeNeetUpdate);
};

/**
 * Fetch NEET updates by UpdateCategory enum
 * Verified Spring Boot endpoint: GET /api/neet-updates/category/{category}
 */
export const getNeetUpdatesByCategory = async (category) => {
  if (!category || category === "ALL") {
    return getNeetUpdates();
  }
  const response = await API.get(`/neet-updates/category/${encodeURIComponent(category)}`);
  const list = Array.isArray(response.data) ? response.data : [];
  return list.map(normalizeNeetUpdate);
};
