from django.core.management.base import BaseCommand
from django.db.models import Q
from store.models import Product
import requests

class Command(BaseCommand):
    help = 'Fix broken product images with category-based fallback images'

    # Category-based fallback images from Unsplash
    FALLBACK_IMAGES = {
        'Electronics': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        'Mobiles': 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop',
        'Fashion': 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
        'Home': 'https://images.unsplash.com/photo-1555041469-a586c61ea9a7?w=500&h=500&fit=crop',
    }

    def is_valid_image_url(self, url):
        """Check if image URL exists and is valid"""
        if not url:
            return False
        
        try:
            response = requests.head(url, timeout=5, allow_redirects=True)
            return response.status_code < 400
        except Exception:
            return False

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Starting product image fix...'))
        
        # Get all products with empty or potentially broken images
        all_products = Product.objects.all()
        fixed_count = 0
        skipped_count = 0
        invalid_count = 0

        for product in all_products:
            # Check if image is empty
            if not product.image:
                category = product.category or 'Electronics'
                fallback = self.FALLBACK_IMAGES.get(category, self.FALLBACK_IMAGES['Electronics'])
                product.image = fallback
                product.save()
                fixed_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Fixed: {product.name} ({category})')
                )
                continue

            # Check if image URL is valid
            if not self.is_valid_image_url(product.image):
                category = product.category or 'Electronics'
                fallback = self.FALLBACK_IMAGES.get(category, self.FALLBACK_IMAGES['Electronics'])
                product.image = fallback
                product.save()
                invalid_count += 1
                self.stdout.write(
                    self.style.WARNING(f'⚠ Fixed broken URL: {product.name} ({category})')
                )
            else:
                skipped_count += 1

        # Summary
        self.stdout.write(self.style.SUCCESS('\n' + '='*50))
        self.stdout.write(self.style.SUCCESS(f'Empty images fixed: {fixed_count}'))
        self.stdout.write(self.style.WARNING(f'Broken URLs fixed: {invalid_count}'))
        self.stdout.write(self.style.SUCCESS(f'Valid images (skipped): {skipped_count}'))
        self.stdout.write(self.style.SUCCESS(f'Total processed: {all_products.count()}'))
        self.stdout.write(self.style.SUCCESS('='*50))
