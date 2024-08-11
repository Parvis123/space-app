import React from "react";

import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Box, Typography, IconButton, Tooltip, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface DateControllerProps {
  selectedDate: dayjs.Dayjs;
  // eslint-disable-next-line no-unused-vars
  onDateChange: (date: dayjs.Dayjs) => void;
  minDate: dayjs.Dayjs;
  maxDate: dayjs.Dayjs;
  showDatePicker?: boolean;
  onToggleDatePicker?: () => void;
}

const DateController: React.FC<DateControllerProps> = ({
  selectedDate,
  onDateChange,
  minDate,
  maxDate,
  showDatePicker = false,
  onToggleDatePicker,
}) => {
  const handlePreviousDay = () => {
    onDateChange(selectedDate.subtract(1, "day"));
  };

  const handleNextDay = () => {
    onDateChange(selectedDate.add(1, "day"));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {selectedDate.isSame(minDate, "day") ? (
          <Tooltip title="No more images beyond this date">
            <span>
              <IconButton
                aria-label="previous day"
                onClick={handlePreviousDay}
                disabled
              >
                <ArrowBackIosSharpIcon />
              </IconButton>
            </span>
          </Tooltip>
        ) : (
          <IconButton aria-label="previous day" onClick={handlePreviousDay}>
            <ArrowBackIosSharpIcon />
          </IconButton>
        )}
        <Typography variant="h4">
          {selectedDate.format("MMMM D, YYYY")}
        </Typography>
        {selectedDate.isSame(maxDate, "day") ? (
          <Tooltip title="This is the most recent date">
            <span>
              <IconButton
                aria-label="next day"
                onClick={handleNextDay}
                disabled
              >
                <ArrowForwardIosSharpIcon />
              </IconButton>
            </span>
          </Tooltip>
        ) : (
          <IconButton aria-label="next day" onClick={handleNextDay}>
            <ArrowForwardIosSharpIcon />
          </IconButton>
        )}
      </Box>
      {onToggleDatePicker && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            height: 56,
            width: "100%",
          }}
        >
          {showDatePicker ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={selectedDate}
                  onChange={(newValue) => {
                    if (newValue) {
                      onDateChange(newValue);
                    }
                  }}
                  minDate={minDate}
                  maxDate={maxDate}
                  disableFuture
                />
              </LocalizationProvider>
              <Button onClick={onToggleDatePicker} sx={{ minWidth: "auto" }}>
                Hide
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              onClick={onToggleDatePicker}
              sx={{ height: 45, width: "auto", minWidth: "auto" }}
            >
              Show Date Picker
            </Button>
          )}
        </Box>
      )}
    </>
  );
};

export default DateController;
