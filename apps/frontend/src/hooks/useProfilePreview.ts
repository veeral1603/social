import React from "react";
function useFilePreview(file?: File | null) {
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!(file instanceof File)) return;
    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return preview;
}

export default useFilePreview;
