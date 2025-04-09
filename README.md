# MEDDICC - FSE Technical Challenge

## Django Setup

0. Setup `postgresql` database (`DB_NAME`, `DB_USER`, and `DB_PASSWORD` are needed in `.env`)
1. Create and define `.env` in `api/` (use `.env.example` as guide)
2. `poetry install --no-root`
3. `cd api/`
4. `poetry run python manage.py migrate`
5. `poetry run python manage.py createsuperuser` (Set the superuser's role to `ADMIN` in the Django Admin to have API permissions)
6. `poetry run python manage.py runserver`
7. To test, `poetry run pytest`

## React Setup

1. `cd app/`
2. Create and define `.env` (use `.env.example` as guide)
3. `pnpm install`
4. `pnpm run dev`

## Notes

- I structured the Django app to be modular with each feature having its own place in the `apps/` directory.
- I placed an emphasis on unit testing (`test_models`, `test_filters`, `test_serializers`, `test_views`) with factories as an aid for easily creating test data.
- Filtering and ordering are supported in the API.
