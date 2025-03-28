from django.contrib import admin

from .models import Slide


# Defining the custom admin interface for the Slide model
class SlideAdmin(admin.ModelAdmin):
    # Display these fields in the list view in the admin panel
    list_display = ("id", "title", "subtitle", "background_color", "text_color")

    # Allow filtering by background color and text color in the admin panel
    list_filter = ("background_color", "text_color")

    # Enable search functionality in the admin panel for title, subtitle, and body fields
    search_fields = ("title", "subtitle", "body")

    # Make the 'id' field read-only, so it cannot be modified in the admin panel
    readonly_fields = ("id",)

    # Organize the fields into sections with labels and categories in the admin form
    fieldsets = (
        (
            "Slide Content",
            {  # Section title for the slide content section
                "fields": (
                    "title",
                    "subtitle",
                    "body",
                    "image",
                )  # Fields to display in this section
            },
        ),
        (
            "Theme Settings",
            {  # Section title for the theme settings
                "fields": (
                    "background_color",
                    "text_color",
                )  # Fields for color settings
            },
        ),
        (
            "Font Sizes",
            {  # Section title for the font size settings
                "fields": (
                    "title_font_size",
                    "subtitle_font_size",
                    "body_font_size",
                )  # Fields for font sizes
            },
        ),
    )


# Register the Slide model with the custom admin interface (SlideAdmin)
admin.site.register(Slide, SlideAdmin)
