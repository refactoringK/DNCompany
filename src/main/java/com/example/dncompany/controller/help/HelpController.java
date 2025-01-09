package com.example.dncompany.controller.help;

import com.example.dncompany.dto.help.HelpListDTO;
import com.example.dncompany.dto.help.HelpWriteDTO;
import com.example.dncompany.dto.help.pet.HelpPetListDTO;
import com.example.dncompany.service.help.HelpService;
import com.example.dncompany.service.help.pet.HelpPetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/help")
@RequiredArgsConstructor
public class HelpController {
    private final HelpService helpService;
    private final HelpPetService helpPetService;

    @GetMapping("/write")
    public String helpWrite(@SessionAttribute(value = "usersId", required = false) Long usersId,
                            Model model) {
        usersId = 6L; // 임시 처리

        List<HelpPetListDTO> petList = helpPetService.getPetListByUsersId(usersId);
        model.addAttribute("petList", petList);

        return "help/write";
    }

    @PostMapping("/write")
    public String helpWrite(@SessionAttribute(value = "usersId", required = false) Long usersId,
                            HelpWriteDTO helpWriteDTO){
        log.info("helpWriteDTO: {}", helpWriteDTO);
        usersId = 6L; // 임시 처리

        helpService.registerHelp(helpWriteDTO, usersId);

        return "redirect:/help/list";
    }

    @GetMapping("/list")
    public String helpList(Model model){
        List<HelpListDTO> helpList = helpService.getHelpList();
        model.addAttribute("helpList", helpList);
        return "help/list";
    }

    @GetMapping("/detail")
    public String helpDetail(){
        return "help/detail";
    }
}










