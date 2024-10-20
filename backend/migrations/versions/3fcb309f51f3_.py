"""empty message

Revision ID: 3fcb309f51f3
Revises: 92f5c8096ba3
Create Date: 2024-06-17 20:23:01.009801

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '3fcb309f51f3'
down_revision = '92f5c8096ba3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('game', schema=None) as batch_op:
        batch_op.alter_column('summary',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=500),
               existing_nullable=False)
        batch_op.alter_column('about',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=10000),
               existing_nullable=True)
        batch_op.alter_column('game_file',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=False)
        batch_op.alter_column('banner_image',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=False)
        batch_op.alter_column('trailer_1',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=True)
        batch_op.alter_column('trailer_2',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=True)
        batch_op.alter_column('trailer_3',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=True)
        batch_op.alter_column('preview_image_1',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=True)
        batch_op.alter_column('preview_image_2',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=True)
        batch_op.alter_column('preview_image_3',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=True)
        batch_op.alter_column('preview_image_4',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=True)
        batch_op.alter_column('preview_image_5',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=True)
        batch_op.alter_column('preview_image_6',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=True)
        batch_op.alter_column('blob_name_prefix',
               existing_type=mysql.TEXT(),
               type_=sa.String(length=200),
               existing_nullable=False)
        batch_op.drop_column('preview_image_3_link')
        batch_op.drop_column('preview_image_1_link')
        batch_op.drop_column('trailer_1_link')
        batch_op.drop_column('preview_image_5_link')
        batch_op.drop_column('game_file_link')
        batch_op.drop_column('preview_image_6_link')
        batch_op.drop_column('trailer_3_link')
        batch_op.drop_column('trailer_2_link')
        batch_op.drop_column('preview_image_2_link')
        batch_op.drop_column('banner_image_link')
        batch_op.drop_column('preview_image_4_link')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('game', schema=None) as batch_op:
        batch_op.add_column(sa.Column('preview_image_4_link', mysql.TEXT(), nullable=True))
        batch_op.add_column(sa.Column('banner_image_link', mysql.TEXT(), nullable=True))
        batch_op.add_column(sa.Column('preview_image_2_link', mysql.TEXT(), nullable=True))
        batch_op.add_column(sa.Column('trailer_2_link', mysql.TEXT(), nullable=True))
        batch_op.add_column(sa.Column('trailer_3_link', mysql.TEXT(), nullable=True))
        batch_op.add_column(sa.Column('preview_image_6_link', mysql.TEXT(), nullable=True))
        batch_op.add_column(sa.Column('game_file_link', mysql.TEXT(), nullable=True))
        batch_op.add_column(sa.Column('preview_image_5_link', mysql.TEXT(), nullable=True))
        batch_op.add_column(sa.Column('trailer_1_link', mysql.TEXT(), nullable=True))
        batch_op.add_column(sa.Column('preview_image_1_link', mysql.TEXT(), nullable=True))
        batch_op.add_column(sa.Column('preview_image_3_link', mysql.TEXT(), nullable=True))
        batch_op.alter_column('blob_name_prefix',
               existing_type=sa.String(length=200),
               type_=mysql.TEXT(),
               existing_nullable=False)
        batch_op.alter_column('preview_image_6',
               existing_type=sa.String(length=200),
               type_=mysql.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('preview_image_5',
               existing_type=sa.String(length=200),
               type_=mysql.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('preview_image_4',
               existing_type=sa.String(length=200),
               type_=mysql.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('preview_image_3',
               existing_type=sa.String(length=200),
               type_=mysql.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('preview_image_2',
               existing_type=sa.String(length=200),
               type_=mysql.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('preview_image_1',
               existing_type=sa.String(length=200),
               type_=mysql.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('trailer_3',
               existing_type=sa.String(length=200),
               type_=mysql.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('trailer_2',
               existing_type=sa.String(length=200),
               type_=mysql.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('trailer_1',
               existing_type=sa.String(length=200),
               type_=mysql.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('banner_image',
               existing_type=sa.String(length=200),
               type_=mysql.TEXT(),
               existing_nullable=False)
        batch_op.alter_column('game_file',
               existing_type=sa.String(length=200),
               type_=mysql.TEXT(),
               existing_nullable=False)
        batch_op.alter_column('about',
               existing_type=sa.String(length=10000),
               type_=mysql.TEXT(),
               existing_nullable=True)
        batch_op.alter_column('summary',
               existing_type=sa.String(length=500),
               type_=mysql.TEXT(),
               existing_nullable=False)

    # ### end Alembic commands ###
