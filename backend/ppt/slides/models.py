from django.db import models


# Model representing a slide in the presentation
class Slide(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    body = models.TextField()
    image = models.ImageField(upload_to="slides/", null=True, blank=True)
    background_color = models.CharField(max_length=7, default="#FFFFFF")
    text_color = models.CharField(max_length=7, default="#000000")
    title_font_size = models.CharField(max_length=10, default="2rem")
    subtitle_font_size = models.CharField(max_length=10, default="1.5rem")
    body_font_size = models.CharField(max_length=10, default="1rem")

    def __str__(self):
        return self.title
