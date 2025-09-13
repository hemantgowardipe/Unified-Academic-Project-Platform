package com.UAPP.submissionService.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendRemarkNotification(String to, String projectTitle, String remarkText) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("New Remark Added to Your Project");
        message.setText("Hello Team Lead,\n\n" +
                "A new remark has been added to your project: " + projectTitle + "\n\n" +
                "Remark: " + remarkText + "\n\n" +
                "Please check the portal for more details.\n\n" +
                "Regards,\nAdmin");

        mailSender.send(message);
    }
}