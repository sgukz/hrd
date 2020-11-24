<?
function FiscalYear($date) {
    // วันที่ที่ต้องการตรวจสอบ
    list($year, $month, $day) = explode("-", $date);
    // วันที่ที่ส่งมา (mktime)
    $cday = mktime(0, 0, 0, $month, $day, $year);
    // ปีงบประมาณตามค่าที่ส่งมา (mktime)
    $d1 = mktime(0, 0, 0, 10, 1, $year );
    // ปีใหม่
    $d2 = mktime(0, 0, 0, 9, 30, $year + 1);
    if ($cday >= $d1 && $cday < $d2) {
        // 1 ตค. -  ธค.
        $year += (543)+1;
    }else{
        $year += 543;
    }
    return "$year";
}