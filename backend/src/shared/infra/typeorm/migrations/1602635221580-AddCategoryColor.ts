import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCategoryColor1602635221580
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('categories', [
      new TableColumn({
        name: 'background_color_light',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'background_color_dark',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('categories', [
      new TableColumn({
        name: 'background_color_light',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'background_color_dark',
        type: 'varchar',
      }),
    ]);
  }
}
