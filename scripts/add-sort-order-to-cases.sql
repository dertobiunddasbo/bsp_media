-- Add sort_order column to cases table
ALTER TABLE cases 
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Set initial sort_order based on created_at for existing cases
UPDATE cases 
SET sort_order = subquery.row_number
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) as row_number
  FROM cases
) AS subquery
WHERE cases.id = subquery.id;

-- Create index for faster sorting
CREATE INDEX IF NOT EXISTS idx_cases_sort_order ON cases(sort_order);
