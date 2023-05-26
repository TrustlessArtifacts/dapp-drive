import ToastError from "@/components/ToastError";
import toast from "react-hot-toast";

export const showToastError = ({ url, linkText, message }: { url?: string; linkText?: string; message: string; }) => {
  toast.remove();
  toast.error(
    (t) => (
      <ToastError
        id={t.id}
        message={message}
        url={url}
        linkText={linkText}
      />
    ),
    {
      duration: 50000,
      position: 'top-right',
      style: {
        maxWidth: '900px',
        borderLeft: '4px solid #FF4747',
      },
    },
  );
}

export const showToastSuccess = ({ message }: { message: string; }) => {
  toast.remove();
  toast.success(message);
}
