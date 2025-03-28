from rest_framework import serializers

from .models import Slide


# Serializer for Slide model, handling serialization and deserialization
class SlideSerializer(serializers.ModelSerializer):
    theme = serializers.SerializerMethodField()  # Custom field for theme-related data

    class Meta:
        model = Slide
        fields = ["id", "title", "subtitle", "body", "image", "theme"]

    # Method to structure theme data
    def get_theme(self, obj):
        return {
            "backgroundColor": obj.background_color,
            "textColor": obj.text_color,
            "fontSizes": {
                "title": obj.title_font_size,
                "subtitle": obj.subtitle_font_size,
                "body": obj.body_font_size,
            },
        }

    # Create method to handle slide creation with theme data
    def create(self, validated_data):
        theme_data = self.initial_data.get("theme", {})
        slide = Slide.objects.create(
            title=validated_data["title"],
            subtitle=validated_data["subtitle"],
            body=validated_data["body"],
            image=validated_data.get("image", None),
            background_color=theme_data.get("backgroundColor", "#FFFFFF"),
            text_color=theme_data.get("textColor", "#000000"),
            title_font_size=theme_data.get("fontSizes", {}).get("title", "2rem"),
            subtitle_font_size=theme_data.get("fontSizes", {}).get(
                "subtitle", "1.5rem"
            ),
            body_font_size=theme_data.get("fontSizes", {}).get("body", "1rem"),
        )
        return slide

    # Update method to handle slide updates with theme data
    def update(self, instance, validated_data):
        theme_data = self.initial_data.get("theme", None)

        instance.title = validated_data.get("title", instance.title)
        instance.subtitle = validated_data.get("subtitle", instance.subtitle)
        instance.body = validated_data.get("body", instance.body)

        if "image" in validated_data:
            instance.image = validated_data["image"]

        if theme_data:
            instance.background_color = theme_data.get(
                "backgroundColor", instance.background_color
            )
            instance.text_color = theme_data.get("textColor", instance.text_color)
            instance.title_font_size = theme_data.get("fontSizes", {}).get(
                "title", instance.title_font_size
            )
            instance.subtitle_font_size = theme_data.get("fontSizes", {}).get(
                "subtitle", instance.subtitle_font_size
            )
            instance.body_font_size = theme_data.get("fontSizes", {}).get(
                "body", instance.body_font_size
            )

        instance.save()
        return instance
