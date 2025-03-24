const useCurrentDate = () => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)?.toString().padStart(2, '0');
    const currentDay = currentDate.getDate()?.toString().padStart(2, '0');
    const today = `${currentYear}-${currentMonth}-${currentDay}`
    const todayMonth = `${currentYear}-${currentMonth}`
    const onlyMonth = `${currentMonth}`
    const onlyYear = `${currentYear}`
    const onlyDay = `${currentDay}`


    return {today, todayMonth, onlyMonth, onlyYear, onlyDay};
};

export default useCurrentDate;