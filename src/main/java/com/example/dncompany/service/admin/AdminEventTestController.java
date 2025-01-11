package com.example.dncompany.service.admin;

import com.example.dncompany.dto.admin.board.AdminEventWriteDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/event")
public class AdminEventTestController {
    private final AdminEventTestService adminEventTestService;

    @GetMapping("/test")
    public String testPage(Model model) {
        log.debug("====== Event Test Page Controller Start ======");
        List<AdminEventWriteDTO> eventList = adminEventTestService.getAllEvents();
        model.addAttribute("eventList", eventList);
        log.debug("====== Event Test Page Controller End ======");
        return "admin/admin_test/event_test";
    }
}