package com.ecotrack.capstone.controller;

import com.ecotrack.capstone.dto.*;
import com.ecotrack.capstone.repository.ReportingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/summary-report")
public class ReportingController {

    @Autowired
    private ReportingRepository reportingRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/financial-year")
    public List<MonthlySummaryDTO> getSummaryReportForFinancialYear() {
        String startDate = "2023-07-01"; // Start of the financial year
        String endDate = "2024-06-30";   // End of the financial year
        List<Object[]> reportData = reportingRepository.findSummaryReportDataByFinancialYear(startDate, endDate);

        return reportData.stream().map(data -> new MonthlySummaryDTO(
                (String) data[0], // month
                (String) data[1], // year
                (String) data[2], // wasteType
                (Double) data[3], // wasteWeight
                (Double) data[4], // recycledRevenue
                (Double) data[5]  // landfillFee
        )).collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/recyclable-weight")
    public List<RecyclableWeightPercentageDTO> getRecyclablesSummaryByWeightYearToDate(
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {

        List<Object[]> reportData = reportingRepository.findRecyclablesSummaryByWeightYearToDate(startDate, endDate);

        return reportData.stream().map(data -> new RecyclableWeightPercentageDTO(
                (String) data[0], // recyclableType
                (Double) data[1], // totalWeight
                (Double) data[2] // weightPercentage
        )).collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/recyclable-revenue")
    public List<RecyclableRevenuePercentageDTO> getRecyclablesSummaryByRevenueYearToDate(
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {

        List<Object[]> reportData = reportingRepository.findRecyclablesSummaryByRevenueYearToDate(startDate, endDate);

        return reportData.stream().map(data -> new RecyclableRevenuePercentageDTO(
                (String) data[0], // recyclableType
                (Double) data[1], // totalRevenue
                (Double) data[2] // revenuePercentage
        )).collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/waste-weight")
    public List<RecyclableWeightPercentageDTO> getWasteByWeightYearToDate(
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {

        List<Object[]> reportData = reportingRepository.findWasteSummaryByWeightYearToDate(startDate, endDate);

        return reportData.stream().map(data -> new RecyclableWeightPercentageDTO(
                (String) data[0], // recyclableType
                (Double) data[1], // totalRevenue
                (Double) data[2] // revenuePercentage
        )).collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/recyclable-sumamry")
    public List<RecyclableSummaryDTO> getRecyclablesSummaryMonthly() {

        List<Object[]> reportData = reportingRepository.findRecyclablesSummaryMonthly();

        return reportData.stream().map(data -> new RecyclableSummaryDTO(
                (String) data[0], // month
                (String) data[1], // year
                (String) data[2], // recyclableType
                (Double) data[3], // totalWeight
                (Double) data[4], // weightPercentage
                (Double) data[5], // totalRevenue
                (Double) data[6] // revenuePercentage
        )).collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/waste-sumamry")
    public List<MonthlyWasteSummaryDTO> getWasteSummaryMonthly() {

        List<Object[]> reportData = reportingRepository.findWasteWeightSummaryMonthly();

        return reportData.stream().map(data -> new MonthlyWasteSummaryDTO(
                (String) data[0], // month
                (String) data[1], // year
                (String) data[2], // recyclableType
                (Double) data[3], // totalWeight
                (Double) data[4] // weightPercentage
        )).collect(Collectors.toList());
    }
}