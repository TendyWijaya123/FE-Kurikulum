import { Steps } from "antd";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

const { Step } = Steps;

const statusList = [
  { value: "belum", label: "📄 Belum" },
  { value: "progres", label: "🔄 Progres" },
  { value: "selesai", label: "✅ Selesai" },
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

  const handleStepClick = (index) => {
    const newStatus = statusList[index].value;
    if (newStatus !== status) {
      debouncedOnChange(newStatus);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ maxWidth: 500, margin: "0 auto", padding: "10px 0" }}
    >
      <Steps
        current={statusToIndex[status]}
        size="small"
        onChange={handleStepClick}
        style={{
          cursor: "pointer",
          background: "#faf5ff",
          borderRadius: 30,
          padding: 16,
        }}
      >
        {statusList.map(({ label }, idx) => {
          const isActive = idx === statusToIndex[status];
          const isCompleted = idx < statusToIndex[status];
          return (
            <Step
              key={idx}
              title={
                <span
                  style={{
                    fontWeight: isActive ? "700" : "500",
                    color: isActive
                      ? "#722ed1"
                      : isCompleted
                      ? "#52c41a"
                      : "rgba(0,0,0,0.25)",
                    transition: "color 0.3s, font-weight 0.3s",
                  }}
                >
                  {label}
                </span>
              }
            />
          );
        })}
      </Steps>
    </motion.div>
  );
};

ProgressButtons.propTypes = {
  status: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProgressButtons;
