import { Steps } from "antd";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

const { Step } = Steps;

const statusList = [
  { value: "belum", label: "Belum" },
  { value: "progres", label: "Progres" },
  { value: "selesai", label: "Selesai" },
];

const statusToIndex = {
  belum: 0,
  progres: 1,
  selesai: 2,
};

const ProgressButtons = ({ status, onChange }) => {
  const debouncedOnChange = useRef(
    debounce((value) => {
      onChange(value);
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  // Fungsi untuk handle klik step, hanya jika beda status
  const handleStepClick = (index) => {
    const newStatus = statusList[index].value;
    if (newStatus !== status) {
      debouncedOnChange(newStatus);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      style={{ maxWidth: 400, margin: "0 auto", padding: "10px 0" }}
    >
      <Steps
        current={statusToIndex[status]}
        size="small"
        progressDot={false}
        onChange={handleStepClick}
        style={{ cursor: "pointer", background: "#fff4ff", borderRadius: 30, padding: 10 }}
      >
        {statusList.map(({ label }, idx) => (
          <Step
            key={idx}
            title={label}
            style={{
              fontWeight: idx === statusToIndex[status] ? "700" : "500",
              color: idx <= statusToIndex[status] ? "#722ed1" : "rgba(0,0,0,0.25)",
            }}
          />
        ))}
      </Steps>
    </motion.div>
  );
};

ProgressButtons.propTypes = {
  status: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProgressButtons;
