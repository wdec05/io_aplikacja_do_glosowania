package com.example.demo.service;

import brevo.ApiClient;
import brevo.ApiException;
import brevo.Configuration;
import brevo.auth.ApiKeyAuth;
import brevoApi.AccountApi;
import brevoApi.TransactionalEmailsApi;
import brevoModel.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;

@Service
public class BrevoMailService {
    @Value("${brevo.stmp}")
    private String stmp ;
    @Value("${brevo.api}")
    private String apikey;
    @Value("${brevo.provider}")
    private String provider;

    public void sendMail(String recipientEmail,Long projectId) {

        // 1. Konfiguracja klienta API (Twój kod)
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        ApiKeyAuth apiKey = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKey.setApiKey(apikey);
        IO.println(stmp);
        IO.println(apiKey);
        // (Opcjonalny) Partner key, zazwyczaj nie jest wymagany do wysyłania
        // ApiKeyAuth partnerKey = (ApiKeyAuth) defaultClient.getAuthentication("partner-key");
        // partnerKey.setApiKey("YOUR_PARTNER_KEY");

        // 2. Utworzenie instancji API do maili transakcyjnych
        TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();

        // 3. Budowanie obiektu e-mail (SendSmtpEmail)
        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail();

        // Ustawienie nadawcy
        // TODO: Zastąp adresem e-mail i nazwą nadawcy zarejestrowaną w Brevo
        SendSmtpEmailSender sender = new SendSmtpEmailSender();
        sender.setEmail(provider);
        sender.setName("IO company");
        sendSmtpEmail.setSender(sender);

        // Ustawienie odbiorcy (z parametru metody)
        SendSmtpEmailTo recipient = new SendSmtpEmailTo();
        recipient.setEmail(recipientEmail);
        // recipient.setName("Imię Odbiorcy"); // Opcjonalnie
        sendSmtpEmail.setTo(Collections.singletonList(recipient));
        String baseUrl = "https://io-aplikacja-do-glosowania-1.onrender.com/api";

        String fullVoteUrl = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/mail/vote") // Path is /vote
                .queryParam("projectId", projectId) // Add projectId as query param
                .queryParam("email", recipientEmail)       // Add email as query param
                .toUriString();
        // Ustawienie treści
        // TODO: Ustaw swój temat i treść
        sendSmtpEmail.setSubject("Testowy e-mail z Brevo API");
        sendSmtpEmail.setHtmlContent(
                "<html><body>" +
                        "<h1>Witaj!</h1>" +
                        "<p>Aby zagłosować, kliknij w poniższy link:</p>" +
                        // TUTAJ JEST POPRAWKA:
                        "<p><a href=\"" + fullVoteUrl + "\">Kliknij tutaj, aby zagłosować</a></p>" +
                        "</body></html>"
        );

        // 4. Wysłanie e-maila (zamiast wywołania getAccount)
        try {
            CreateSmtpEmail result = apiInstance.sendTransacEmail(sendSmtpEmail);
            System.out.println("E-mail wysłany pomyślnie. Message ID: " + result.getMessageId());
        } catch (ApiException e) {
            System.err.println("Wyjątek podczas wywołania TransactionalEmailsApi#sendTransacEmail");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Response body: " + e.getResponseBody());
            System.err.println("Reason: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

