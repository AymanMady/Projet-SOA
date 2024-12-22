package com.springDemo.controller;


import com.springDemo.models.Abonnee;
import com.springDemo.models.Article;
import com.springDemo.repositories.AbonneeRepository;
import com.springDemo.repositories.ArticleRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private AbonneeRepository abonneeRepository;

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    @PostMapping
    public Article createArticle(@RequestBody Article article) {
        return articleRepository.save(article);
    }

    @GetMapping("/{id}")
    public Article getArticleById(@PathVariable Long id) {
        return articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
    }

    @PutMapping("/{id}")
    public Article updateArticle(@PathVariable Long id, @RequestBody Article articleDetails) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));

        article.setTitle(articleDetails.getTitle());
        article.setContent(articleDetails.getContent());
        article.setCreatedAt(articleDetails.getCreatedAt());
        article.setCategorie(articleDetails.getCategorie());
        article.setAbonnee(articleDetails.getAbonnee());

        return articleRepository.save(article);
    }

    @DeleteMapping("/{id}")
    public void deleteArticle(@PathVariable Long id) {
        articleRepository.deleteById(id);
    }



    @PostMapping("/send-emails/{id}")
    public String sendEmailsToSubscribers(@PathVariable Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        List<Abonnee> abonnes = abonneeRepository.findAll();
        String messageContent = createEmailContent(article);

        for (Abonnee abonnee : abonnes) {
            sendEmail(abonnee.getEmail(), messageContent);
        }

        return "Emails sent to all subscribers regarding the article.";
    }

    private String createEmailContent(Article article) {
        return "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; }" +
                "h1 { color: #333; }" +
                "p { font-size: 16px; line-height: 1.5; }" +
                ".footer { margin-top: 20px; font-size: 12px; color: #888; }" +
                "img { max-width: 100%; height: auto; margin-top: 20px; }" + // Style pour l'image
                "</style>" +
                "</head>" +
                "<body>" +
                "<h1>" + article.getTitle() + "</h1>" +
                "<p>" + article.getContent() + "</p>" +
                "<p><strong>Date:</strong> " + article.getCreatedAt() + "</p>" +
                "<img src='https://www.apa.org/images/2018-12-top-journals-sa-2_tcm7-248467_w1024_n.jpg' alt='Image de l'article'>" +
                "<p class='footer'>Merci de votre intérêt!</p>" +
                "</body>" +
                "</html>";
    }

    private void sendEmail(String to, String content) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Nouvel Article Publié");
            helper.setText(content, true); // true indicates the content is HTML
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace(); // Gérer l'exception comme vous le souhaitez
        }
    }
}
